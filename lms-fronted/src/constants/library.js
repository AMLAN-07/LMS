export const ORGANIZATION_NAME =
  "Centurion university technology and management";

export const emptyStudent = {
  firstName: "",
  lastName: "",
  email: "",
  course: "BCA",
  rollNumber: "",
  organizationName: ORGANIZATION_NAME,
  active: true,
};

export const emptyBook = {
  title: "",
  author: "",
  isbn: "",
  publisher: "",
  bookcopy: 1,
  categoryId: "",
};

export const emptyCategory = { name: "", description: "" };

export const adminPages = [
  "Dashboard",
  "Students",
  "Books",
  "Categories",
  "Issue Book",
  "Return Book",
  "Fines",
  "Reports",
  "Profile",
];
export const studentPages = [
  "My Dashboard",
  "Books",
  "My Books",
  "Fines",
  "Profile",
];

export const normalizeOrg = (value) =>
  (value || ORGANIZATION_NAME).trim().toLowerCase();
export const sameOrganization = (itemOrg, userOrg) =>
  normalizeOrg(itemOrg) === normalizeOrg(userOrg);
