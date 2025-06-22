import React from "react";
import { useState } from "react";

const initialUser = {
  email: "",
  phone: "",
  otp: "",
};

const Register = () => {
  const { register } = useAuthStore();
  const [data, setData] = useState(initialUser);

  

  return <div>Register</div>;
};

export default Register;
