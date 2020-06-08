# Migration `20200606214436-user`

This migration has been generated at 6/6/2020, 9:44:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "createdAt" timestamp(3)  NOT NULL ,
ADD COLUMN "updatedAt" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200603160234-user..20200606214436-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,17 +1,19 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id              Int     @id @default(autoincrement())
-  email           String  @unique
+  id              Int      @id @default(autoincrement())
+  email           String   @unique
   first_name      String
   last_name       String
   mobile          String?
   hashed_password String
+  updatedAt       DateTime
+  createdAt       DateTime
 }
```


