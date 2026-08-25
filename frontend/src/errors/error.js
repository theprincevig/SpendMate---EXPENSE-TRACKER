import { validateEmail, validatePassword } from "../lib/validators";

export const validateSignup = (formData) => {
    const errors = {
        username: "",
        email: "",
        password: ""
    };

    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    // Password
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
        errors.password = "Password must be at least 8 characters long";
    }

    return errors;
}

export const validateLogin = (formData) => {
    const errors = {
        email: "",
        password: ""
    };

    if (!validateEmail(formData.email)) {
        errors.email = "Email is required";
    }

    if (!validatePassword(formData.password)) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validateChangePassword = (passwordData) => {
    const errors = {
        current: "",
        new: "",
        confirm: ""
    };

    // Current
    if (!passwordData.current.trim()) {
        errors.current = "Current password is required";
    }

    // New
    if (!passwordData.new.trim()) {
        errors.new = "New password is required";
    } else if (!validatePassword(passwordData.new)) {
        errors.new = "Password must be at least 8 characters";
    }

    // Confirm
    if (!passwordData.confirm.trim()) {
        errors.confirm = "Please confirm your password";
    } else if (passwordData.new !== passwordData.confirm) {
        errors.confirm = "Passwords doesn't match"
    }

    // Prevent same password reuse
    if (
        passwordData.current && 
        passwordData.new && 
        passwordData.current === passwordData.new
    ) {
        errors.new = "New password must be different";
    }

    return errors;
};

export const validateProfile = (profileData) => {
    const errors = {
        fullName: "",
        dob: "",
        // address: {
        //     city: "",
        //     state: "",
        //     country: "",
        // },
    };

    // Full name
    if (!profileData.fullName?.trim()) {
        errors.fullName = "Full Name is required";

    } else if (profileData.fullName.trim().length < 2) {
        errors.fullName = "Full name must be at least 2 characters";
    }

    // Date of Birth
    if (!profileData.dob) {
        errors.dob = "Date of birth is required";

    } else {
        const dob = new Date(profileData.dob);
        const today = new Date();

        if (dob > today) {
            errors.dob = "Date of birth cannot be in the future";
        }

        let age = today.getFullYear() - dob.getFullYear();

        const monthDiff = today.getMonth() - dob.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
            age--;
        }

        if (age < 18) {
            errors.dob = "You must be at least 18 years old";
        }
    }

    // // Address - City
    // if (!profileData.address?.city?.trim()) {
    //     errors.address.city = "City is required";
    // }

    // // Address - State
    // if (!profileData.address?.state?.trim()) {
    //     errors.address.state = "State is required";
    // }

    // // Address - Country
    // if (!profileData.address?.country?.trim()) {
    //     errors.address.country = "Country is required";
    // }

    return errors;
};

export const hasErrors = (errors) => {
    return Object.values(errors).some((value) => {
        if (typeof value === "string") {
            return value !== "";
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        if (typeof value === "object" && value !== null) {
            return hasErrors(value);
        }

        return false;
    });
};