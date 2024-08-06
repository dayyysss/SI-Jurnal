// src/utils/globalConstantUtil.jsx
const constants = Object.freeze({
    MODAL_BODY_TYPES: {
        USER_DETAIL: "USER_DETAIL",
        LEAD_ADD_NEW: "LEAD_ADD_NEW",
        CONFIRMATION: "CONFIRMATION",
        DEFAULT: "",
    },

    RIGHT_DRAWER_TYPES: {
        NOTIFICATION: "NOTIFICATION",
        CALENDAR_EVENTS: "CALENDAR_EVENTS",
    },

    CONFIRMATION_MODAL_CLOSE_TYPES: {
        LEAD_DELETE: "LEAD_DELETE",
    },
});

export const { MODAL_BODY_TYPES, RIGHT_DRAWER_TYPES, CONFIRMATION_MODAL_CLOSE_TYPES } = constants;
