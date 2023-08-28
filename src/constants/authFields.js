const loginFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "Email Address",
    validation: {
      required: {
        value: true,
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      message: "Enter a valid email address",
    },
  },

  {
    name: "password",
    label: "password",
    type: "password",
    id: "password",
    placeholder: "Password",
    validation: {
      required: {
        value: true,
      },
      minLength: {
        value: 6,
      },
      message: "Enter a valid password",
    },
  },
];

const signupFields = [
  {
    name: "first_name",
    label: "first name",
    type: "first name",
    id: "first name",
    placeholder: "First Name",
    validation: {
      required: {
        value: true,
      },
      message: "First Name is required",
    },
  },
  {
    name: "last_name",
    label: "last name",
    type: "last name",
    id: "last name",
    placeholder: "Last Name",
    validation: {
      required: {
        value: true,
      },
      message: "Last Name is required",
    },
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "Email Address",
    validation: {
      required: {
        value: true,
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      message: "Enter a valid email address",
    },
  },
  {
    name: "password",
    label: "password",
    type: "password",
    id: "password",
    placeholder: "Password",
    description: "Your password must be at least 8 characters long",
    validation: {
      required: {
        value: true,
      },
      minLength: {
        value: 6,
      },
      message: "Your password must be at least 8 characters long",
    },
  },
  {
    name: "confirm_password",
    label: "confirm-password",
    type: "password",
    id: "confirm-password",
    placeholder: "Confirm Password",
    validation: {
      match: {
        value: true,
      },
      message: "Passwords don't match",
    },
  },
];

const resetFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    id: "email",
    placeholder: "Email Address",
    validation: {
      required: {
        value: true,
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      message: "Enter a valid email address",
    },
  },
];

export { loginFields, signupFields, resetFields };
