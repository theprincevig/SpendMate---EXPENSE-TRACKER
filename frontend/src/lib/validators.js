// ==============================
//   REGEX VALIDATIONS
// ==============================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^.{8,64}$/;

// ==============================
//   HELPER VALIDATION FUNCTIONS
// ==============================
export const validateEmail = (email) => emailRegex.test(email);
export const validatePassword = (password) => passwordRegex.test(password);