# Migration `20200606220501-use`

This migration has been generated at 6/6/2020, 10:05:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN "created_at" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updated_at" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200606214436-user..20200606220501-use
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -13,7 +13,7 @@
   first_name      String
   last_name       String
   mobile          String?
   hashed_password String
-  updatedAt       DateTime
-  createdAt       DateTime
+  created_at      DateTime @default(now())
+  updated_at      DateTime @updatedAt
 }
```


