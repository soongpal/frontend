// export interface LoginForm {
//     username: string;
//     password: string;
//     }

// export interface LoginFormErrors {
//     username?: string;
//     password?: string;
//     }

// export function validateLoginForm(form: LoginForm): LoginFormErrors {
//     const errors: LoginFormErrors = {};

//     if (!form.username) {
//         errors.username = "잘못된 아이디입니다.";
//     }

//     if (!form.password) {
//         errors.password = "잘못된 비밀번호입니다.";
//     }

//     return errors;
// }