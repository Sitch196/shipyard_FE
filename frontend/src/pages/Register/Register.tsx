import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import "./Register.styles.css";
import { validationSchema } from "./utils/validationSchema";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Error during registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background"></div>
      <div className="register-content">
        <h1>Register</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            isShipyardOwner: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="register-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="register-input"
                />
                {errors.name && touched.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="register-input"
                />
                {errors.email && touched.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Choose a password (min. 8 characters)"
                  className="register-input"
                />
                {errors.password && touched.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <label className="register-checkbox">
                <Field
                  type="checkbox"
                  name="isShipyardOwner"
                  id="isShipyardOwner"
                />
                <span>Register as Shipyard Owner</span>
              </label>

              <button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="register-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};
