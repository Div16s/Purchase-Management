-- In the `UP` function, create a foreign key constraint on the Form table referencing the User table:
ALTER TABLE "Form"
ADD COLUMN "userId" INTEGER;

-- Next, establish the foreign key constraint:
ALTER TABLE "Form"
ADD CONSTRAINT "FK__Form__userId"
FOREIGN KEY ("userId")
REFERENCES "User"("id")
ON DELETE SET NULL;

-- In the `DOWN` function, remove the foreign key constraint and the column:
ALTER TABLE "Form"
DROP CONSTRAINT "FK__Form__userId";

ALTER TABLE "Form"
DROP COLUMN "userId";