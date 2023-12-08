export const usernameRegexp: RegExp = /[a-zA-Z0-9_./-]{5,20}/;
export const passwordRegexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-@$!%*?&_])[A-Za-z\d@$_!%*?&\-\_]{8,}$/gm