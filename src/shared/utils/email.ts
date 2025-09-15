/**
 * 
^: Asserts the start of the string.
[^\s@]+: Matches one or more characters that are NOT whitespace (\s) or the "at" symbol (@). This covers the local part of the email address (before the @).
@: Matches the literal "at" symbol.
[^\s@]+: Matches one or more characters that are NOT whitespace (\s) or the "at" symbol (@). This covers the domain name.
\.: Matches a literal dot (.). The dot is escaped with a backslash because it's a special character in regex.
[^\s@]+: Matches one or more characters that are NOT whitespace (\s) or the "at" symbol (@). This covers the top-level domain (e.g., com, org).
$: Asserts the end of the string.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
