# Migration `20200603160234-user`

This migration has been generated at 6/3/2020, 4:02:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200603154709-user..20200603160234-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,15 +1,15 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id              String  @id @default(autoincrement())
+  id              Int     @id @default(autoincrement())
   email           String  @unique
   first_name      String
   last_name       String
   mobile          String?
```


