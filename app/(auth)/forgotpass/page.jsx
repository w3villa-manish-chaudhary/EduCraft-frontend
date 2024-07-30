import './forgot.css';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <>
      <div className="forgot-password-container">
        <div className="card forgot-password-card">
          <h2 className="card-title">Forgot Password</h2>
          <p className="card-text">Please enter your email address</p>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="form-control"
              />
            </div>
            <div className="form-actions">
              <Link href="/login" className="btn btn-secondary">
                Back to Login
              </Link>
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
