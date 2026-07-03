import api from "./axios";

// ======================
// GET PROFILE
// ======================

export const getProfile = async () => {

    const response = await api.get(
        "/user/profile"
    );

    return response.data;

};

// ======================
// UPDATE PROFILE
// ======================

export const updateProfile = async (formData) => {

    const response = await api.patch(

        "/user/profile",

        formData,

        {

            headers: {

                "Content-Type":
                    "multipart/form-data",

            },

        }

    );

    return response.data;

};

// ======================
// CHANGE PASSWORD
// ======================

export const changePassword = async (
    passwordData
) => {

    const response = await api.patch(

        "/user/change-password",

        passwordData

    );

    return response.data;

};