import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulid';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // =====================
  // 1. Seed Roles
  // =====================
  const roles = [
    { id: ulid(), name: 'SUPER_ADMIN', description: 'Full system access' },
    { id: ulid(), name: 'ADMIN', description: 'System & user management' },
    {
      id: ulid(),
      name: 'HR_MANAGER',
      description: 'Manage employees & payroll',
    },
    {
      id: ulid(),
      name: 'FINANCE_MANAGER',
      description: 'Manage accounting & invoices',
    },
    {
      id: ulid(),
      name: 'SALES_MANAGER',
      description: 'Manage customers & sales orders',
    },
    {
      id: ulid(),
      name: 'INVENTORY_MANAGER',
      description: 'Manage products & warehouses',
    },
    {
      id: ulid(),
      name: 'PROJECT_MANAGER',
      description: 'Manage projects & tasks',
    },
    {
      id: ulid(),
      name: 'EMPLOYEE',
      description: 'Regular employee with limited access',
    },
    { id: ulid(), name: 'GUEST', description: 'Read-only access' },
  ];

  await prisma.role.createMany({ data: roles });
  console.log(`✅ Seeded ${roles.length} roles`);

  // =====================
  // 2. Seed Permissions
  // =====================
  const permissions = [
    // User & Role
    'CREATE_USER',
    'VIEW_USER',
    'UPDATE_USER',
    'DELETE_USER',
    'ASSIGN_ROLE',
    'VIEW_ROLE',
    'MANAGE_ROLE',

    // HR
    'CREATE_EMPLOYEE',
    'VIEW_EMPLOYEE',
    'UPDATE_EMPLOYEE',
    'DELETE_EMPLOYEE',
    'MANAGE_PAYROLL',
    'VIEW_ATTENDANCE',
    'MANAGE_ATTENDANCE',

    // Finance
    'CREATE_INVOICE',
    'VIEW_INVOICE',
    'UPDATE_INVOICE',
    'DELETE_INVOICE',
    'MANAGE_EXPENSE',
    'VIEW_REPORT_FINANCE',

    // Sales & CRM
    'CREATE_CUSTOMER',
    'VIEW_CUSTOMER',
    'UPDATE_CUSTOMER',
    'DELETE_CUSTOMER',
    'CREATE_ORDER',
    'VIEW_ORDER',
    'UPDATE_ORDER',
    'DELETE_ORDER',
    'EXPORT_ORDER',

    // Inventory & Warehouse
    'CREATE_PRODUCT',
    'VIEW_PRODUCT',
    'UPDATE_PRODUCT',
    'DELETE_PRODUCT',
    'MANAGE_STOCK',
    'VIEW_STOCK',
    'TRANSFER_STOCK',
    'VIEW_SUPPLIER',
    'MANAGE_SUPPLIER',

    // Project & Task
    'CREATE_PROJECT',
    'VIEW_PROJECT',
    'UPDATE_PROJECT',
    'DELETE_PROJECT',
    'CREATE_TASK',
    'VIEW_TASK',
    'UPDATE_TASK',
    'DELETE_TASK',

    // System & Audit
    'VIEW_AUDIT_LOG',
    'MANAGE_SETTINGS',
    'BACKUP_DATABASE',
    'RESTORE_DATABASE',
  ].map((p) => ({ id: ulid(), name: p }));

  await prisma.permission.createMany({ data: permissions });
  console.log(`✅ Seeded ${permissions.length} permissions`);

  // =====================
  // 3. Mapping Roles ↔ Permissions
  // =====================
  // Helper: get ids by name
  const roleMap = Object.fromEntries(
    (await prisma.role.findMany()).map((r) => [r.name, r.id]),
  );
  const permMap = Object.fromEntries(
    (await prisma.permission.findMany()).map((p) => [p.name, p.id]),
  );

  const rolePermissions: { role_id: string; permission_id: string }[] = [];

  // SUPER_ADMIN → all permissions
  for (const p of Object.values(permMap)) {
    rolePermissions.push({ role_id: roleMap['SUPER_ADMIN'], permission_id: p });
  }

  // ADMIN → User & Role + Audit + Settings
  const adminPerms = [
    'CREATE_USER',
    'VIEW_USER',
    'UPDATE_USER',
    'DELETE_USER',
    'ASSIGN_ROLE',
    'VIEW_ROLE',
    'MANAGE_ROLE',
    'VIEW_AUDIT_LOG',
    'MANAGE_SETTINGS',
  ];
  for (const p of adminPerms) {
    rolePermissions.push({
      role_id: roleMap['ADMIN'],
      permission_id: permMap[p],
    });
  }

  // HR_MANAGER
  const hrPerms = [
    'CREATE_EMPLOYEE',
    'VIEW_EMPLOYEE',
    'UPDATE_EMPLOYEE',
    'DELETE_EMPLOYEE',
    'MANAGE_PAYROLL',
    'VIEW_ATTENDANCE',
    'MANAGE_ATTENDANCE',
  ];
  for (const p of hrPerms) {
    rolePermissions.push({
      role_id: roleMap['HR_MANAGER'],
      permission_id: permMap[p],
    });
  }

  // FINANCE_MANAGER
  const financePerms = [
    'CREATE_INVOICE',
    'VIEW_INVOICE',
    'UPDATE_INVOICE',
    'DELETE_INVOICE',
    'MANAGE_EXPENSE',
    'VIEW_REPORT_FINANCE',
  ];
  for (const p of financePerms) {
    rolePermissions.push({
      role_id: roleMap['FINANCE_MANAGER'],
      permission_id: permMap[p],
    });
  }

  // SALES_MANAGER
  const salesPerms = [
    'CREATE_CUSTOMER',
    'VIEW_CUSTOMER',
    'UPDATE_CUSTOMER',
    'DELETE_CUSTOMER',
    'CREATE_ORDER',
    'VIEW_ORDER',
    'UPDATE_ORDER',
    'DELETE_ORDER',
    'EXPORT_ORDER',
  ];
  for (const p of salesPerms) {
    rolePermissions.push({
      role_id: roleMap['SALES_MANAGER'],
      permission_id: permMap[p],
    });
  }

  // INVENTORY_MANAGER
  const inventoryPerms = [
    'CREATE_PRODUCT',
    'VIEW_PRODUCT',
    'UPDATE_PRODUCT',
    'DELETE_PRODUCT',
    'MANAGE_STOCK',
    'VIEW_STOCK',
    'TRANSFER_STOCK',
    'VIEW_SUPPLIER',
    'MANAGE_SUPPLIER',
  ];
  for (const p of inventoryPerms) {
    rolePermissions.push({
      role_id: roleMap['INVENTORY_MANAGER'],
      permission_id: permMap[p],
    });
  }

  // PROJECT_MANAGER
  const projectPerms = [
    'CREATE_PROJECT',
    'VIEW_PROJECT',
    'UPDATE_PROJECT',
    'DELETE_PROJECT',
    'CREATE_TASK',
    'VIEW_TASK',
    'UPDATE_TASK',
    'DELETE_TASK',
  ];
  for (const p of projectPerms) {
    rolePermissions.push({
      role_id: roleMap['PROJECT_MANAGER'],
      permission_id: permMap[p],
    });
  }

  // EMPLOYEE → chỉ được view cơ bản
  const employeePerms = [
    'VIEW_USER',
    'VIEW_PROJECT',
    'VIEW_TASK',
    'VIEW_ORDER',
    'VIEW_PRODUCT',
    'VIEW_CUSTOMER',
  ];
  for (const p of employeePerms) {
    rolePermissions.push({
      role_id: roleMap['EMPLOYEE'],
      permission_id: permMap[p],
    });
  }

  // GUEST → chỉ view public
  const guestPerms = ['VIEW_PROJECT', 'VIEW_TASK'];
  for (const p of guestPerms) {
    rolePermissions.push({
      role_id: roleMap['GUEST'],
      permission_id: permMap[p],
    });
  }

  // Insert all role-permissions
  await prisma.rolePermission.createMany({
    data: rolePermissions,
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${rolePermissions.length} role-permissions`);

  console.log('🌱 Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
