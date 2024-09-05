import * as Yup from "yup";

export const formSchema = Yup.object({
    // "Please enter your email."
    name:Yup.string().min(2).max(30).required().label('Name'),
    email:Yup.string().email().required().label('Email').label('Email'),
    mobile:Yup.number("It must").required().label('Mobile'),
    password: Yup.string().min(2).required().label('Password'),
    cpassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label('Confirm Password'),
    comments: Yup.string().required().label('Comments'),
});