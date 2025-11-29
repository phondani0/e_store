#!/bin/bash

API_URL="https://api-estore.ankitphondani.com/"
CATEGORIES=("technology" "gadgets" "electronics")

NAMES=(
  "Wireless Earbuds Pro" "Smart Fitness Watch" "Bluetooth Speaker Mini" "Ultra HD Action Camera"
  "Portable SSD Drive" "Noise Cancelling Headphones" "Smartphone Power Bank" "Bluetooth Tracker Tag"
  "USB-C Charging Hub" "Mechanical Gaming Keyboard" "Gaming Mouse RGB" "4K Streaming Stick"
  "Fast Wireless Charger" "WiFi Mesh Router" "VR Headset Lite" "Laptop Cooling Pad" "Smart Home Plug"
  "USB Microphone Pro" "Digital Drawing Tablet" "Touchscreen Stylus Pen" "Wireless Security Camera"
  "1080p Dash Cam" "Smart Thermostat Mini" "Portable Bluetooth Printer" "Rechargeable Book Light"
  "Bluetooth Beanie Headphones" "Multi-Device Bluetooth Keyboard" "Portable Bluetooth Projector"
  "Foldable Laptop Stand" "Smart Light Bulb" "Wireless Presentation Remote" "High-Speed HDMI Cable"
  "USB Desk Fan" "LED Monitor Lamp" "Bluetooth Audio Receiver" "Bluetooth Car Adapter"
  "Waterproof Bluetooth Speaker" "Magnetic Phone Mount" "Electric Toothbrush Pro" "Wireless Barcode Scanner"
  "Laser Distance Measurer"
)
DESCRIPTIONS=(
  "True wireless sound, noise reduction, touch controls, and all-day battery."
  "Track fitness, heart rate, sleep, and notifications on your wrist."
  "Compact speaker with deep bass, Bluetooth 5.0, and 10hr playtime."
  "Capture every moment in 4K, waterproof and ultra-portable."
  "High-speed external SSD, USB-C compatible, durable shell."
  "Deep bass, active noise cancellation, over-ear comfort."
  "Ultra-compact, fast charging, dual USB output—great for travel."
  "Find your lost items instantly—Bluetooth tracker with mobile app."
  "Charge up to 7 devices at once—USB-C, USB-A, SD card reader."
  "Customizable RGB, anti-ghosting keys, and tactile feedback."
  "Ultra-precise gaming mouse with RGB lighting and programmable buttons."
  "Stream in 4K, voice remote, works with all major platforms."
  "Qi-certified wireless charging pad with fast charge support."
  "Seamless WiFi coverage for your whole home—easy app setup."
  "Lightweight VR headset for mobile and PC gaming."
  "Keep your laptop cool—whisper-quiet dual fans, USB powered."
  "Turn any outlet into a smart plug—control via Alexa or Google."
  "Professional-quality USB microphone for streaming and podcasts."
  "Pressure-sensitive tablet for digital artists and graphic designers."
  "Responsive stylus, palm rejection, works on most touchscreens."
  "HD night vision, motion alerts, cloud storage enabled."
  "Full HD recording, loop video, built-in GPS for road safety."
  "Smart climate control, app scheduling, energy saving."
  "Instant photo printing—compact, Bluetooth, rechargeable."
  "Clip-on light with adjustable brightness, perfect for reading."
  "Winter beanie with built-in wireless stereo headphones."
  "Connects to 3 devices, quiet keys, rechargeable battery."
  "Pocket-size projector—wireless screen mirroring, built-in speaker."
  "Strong, foldable stand for laptops up to 17 inches."
  "App-controlled color, schedules, and dimming—works with Alexa."
  "Advance slides, timer vibration, laser pointer for presenters."
  "High-speed HDMI, 4K HDR, gold-plated connectors."
  "USB-powered desk fan with silent operation and adjustable angle."
  "Monitor lamp with adjustable brightness, anti-glare design."
  "Bluetooth audio receiver for headphones or speakers."
  "Add Bluetooth to any car—stream music, hands-free calls."
  "Shockproof, waterproof speaker for outdoor adventures."
  "360° magnetic phone mount for safe, one-handed operation."
  "Powerful sonic cleaning, smart timer, USB charging."
  "Scan barcodes wirelessly to your computer or POS device."
  "Accurate laser measure, backlit display, memory function."
)

for i in {1..100}; do
  CAT="${CATEGORIES[$RANDOM % ${#CATEGORIES[@]}]}"
  NAME="${NAMES[$RANDOM % ${#NAMES[@]}]} $((1000 + RANDOM % 9000))"
  DESC="${DESCRIPTIONS[$RANDOM % ${#DESCRIPTIONS[@]}]}"
  IMG="https://picsum.photos/400/300"
  PRICE=$(( (RANDOM % 990) + 10 ))         # 10 to 999
  QUANTITY=$(( (RANDOM % 90) + 10 ))      # 10 to 99

  DATA="{
    \"query\": \"mutation CreateProduct(\$data: CreateProductInput) { createProduct(data: \$data) { name } }\",
    \"variables\": {
      \"data\": {
        \"description\": \"$DESC\",
        \"image\": \"$IMG\",
        \"name\": \"$NAME\",
        \"price\": $PRICE,
        \"quantity\": $QUANTITY,
        \"category\": \"$CAT\"
      }
    },
    \"operationName\": \"CreateProduct\"
  }"

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
    -H 'Accept: */*' \
    -H 'content-type: application/json' \
    --data-raw "$DATA")

  HTTP_BODY=$(echo "$RESPONSE" | head -n1)
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

  if [[ "$HTTP_BODY" =~ "errors" ]] || [[ "$HTTP_CODE" != "200" ]]; then
    echo "Error creating: $NAME ($CAT) - $PRICE, $QUANTITY"
    echo "HTTP $HTTP_CODE"
    echo "Request data: $DATA"
    echo "Response: $HTTP_BODY"
    echo "-----------------------------------------------"
  else
    echo "Created: $NAME ($CAT) - $PRICE, $QUANTITY"
  fi
done

