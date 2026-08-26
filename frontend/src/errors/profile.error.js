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
