-- AlterTable
ALTER TABLE "ApproverTaskMapping" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DepartmentTaskMapping" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OnboardingEmployeeTaskMapping" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false;
