# Migration `20200603154709-user`

This migration has been generated at 6/3/2020, 3:47:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"first_name" text  NOT NULL ,"hashed_password" text  NOT NULL ,"id" SERIAL,"last_name" text  NOT NULL ,"mobile" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200603154709-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id              String  @id @default(autoincrement())
+  email           String  @unique
+  first_name      String
+  last_name       String
+  mobile          String?
+  hashed_password String
+}
```


