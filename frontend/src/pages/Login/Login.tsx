import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import "./Login.styles.css";
import { validationSchema } from "./utils/validationSchema";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Error during login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="login-input"
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
                placeholder="Enter your password"
                className="login-input"
              />
              {errors.password && touched.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="login-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
