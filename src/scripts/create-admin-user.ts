import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Configuration for the admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";
  const adminName = process.env.ADMIN_NAME || "Administrator";

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists.`);
      
      // We need to check for isAdmin with a type assertion since it's a new field
      // @ts-ignore - isAdmin property might not exist in the type but exists in DB
      const isAlreadyAdmin = existingAdmin.isAdmin === true;
      
      if (!isAlreadyAdmin) {
        // Update admin privileges using Prisma.UserUpdateInput
        const updateData: Prisma.UserUpdateInput = {
          // @ts-ignore - isAdmin is new in schema but TypeScript hasn't caught up
          isAdmin: true
        };
        
        await prisma.user.update({
          where: { email: adminEmail },
          data: updateData,
        });
        console.log(`Updated user ${adminEmail} to have admin privileges.`);
      }
      
      return;
    }

    // Create the admin user with properly typed input
    const hashedPassword = await hash(adminPassword, 10);
    
    const userData: Prisma.UserCreateInput = {
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      // @ts-ignore - isAdmin is new in schema but TypeScript hasn't caught up
      isAdmin: true,
    };

    const adminUser = await prisma.user.create({
      data: userData,
    });

    console.log(`Created admin user with email ${adminEmail}`);
    console.log(`Admin user ID: ${adminUser.id}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 