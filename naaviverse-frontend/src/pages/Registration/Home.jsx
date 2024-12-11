import React, { useEffect, useState } from 'react';
import logo from "./assets/new/logo.svg"
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import tickMark from "./tick.svg"
import tickMarkValid from "./tickMarkValid.svg"
const NewHomePage = () => {
    const navigate = useNavigate()
    const [createAccountLoading, setCreateAccountLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [appData, setAppData] = useState(null);
    const [showOtp, setShowOtp] = useState(false);
    const [userOtp, setUserOtp] = useState('')
    const [wrongOtp, setWrongOtp] = useState(true)
    const [loading, setLoading] = useState(false)
    const [signupRole, setSignupRole] = useState(""); 
    const [usernameAvailable, setUsernameAvailable] = useState(false)
    const [emailAvailable, setEmailAvailable] = useState(false)
    const [showPassReq, setShowPassReq] = useState(false)
    const [validations, setValidations] = useState({
      capitalLetter: false,
      specialCharacter: false,
      tenCharacters: false,
      oneNumber: false
    });

    const isNextStepEnabled = () => {
      return (
        userEmail &&
        userName &&
        userPassword &&
        confirmPassword &&
        userPassword === confirmPassword &&
        validations.capitalLetter &&
        validations.specialCharacter &&
        validations.tenCharacters &&
        validations.oneNumber
      );
    };

    useEffect(() => {
      validatePassword(userPassword);
    }, [userPassword]);

    // useEffect(() => {
    //     axios
    //       .post(`/auth/duplicatedusername`, {
    //         params: {
    //           username: userName,
    //         },
    //       })
    //       .then(({ data }) => {
    //         if (data.status || data.count === 1) {
    //             setUsernameAvailable(false);
    //         } else {
    //             setUsernameAvailable(true);
    //         }
    //       });
    //   }, [userName]);

    //   useEffect(() => {
    //     axios
    //       .post(`/auth/duplicatedemail`, {
    //         params: {
    //           email: userEmail,
    //         },
    //       })
    //       .then(({ data }) => {
    //         if (data.count === 1) {
    //             setEmailAvailable(false);
    //         } else {
    //           if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(userEmail)) {
    //             setEmailAvailable(true);
    //           } else {
    //             setEmailAvailable(false);
    //           }
    //         }
    //       });
    //   }, [userEmail]);

    // useEffect(() => {
    //     axios
    //       .get(`https://comms.globalxchange.io/gxb/apps/get?app_code=naavi`)
    //       .then(({ data }) => {
    //         if (data.apps.length > 0) {
    //           setAppData(data.apps[0]);
    //         } else {
    //           setAppData(data.apps[0]);
    //         }
    //       });
    //   }, []);

      const validatePassword = (password) => {
        const capitalLetterRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        const numberRegex = /[0-9]/;
    
        const isCapitalLetter = capitalLetterRegex.test(password);
        const isSpecialCharacter = specialCharacterRegex.test(password);
        const isTenCharacters = password.length >= 10;
        const isOneNumber = numberRegex.test(password);
    
        // Update validation state
        setValidations({
          capitalLetter: isCapitalLetter,
          specialCharacter: isSpecialCharacter,
          tenCharacters: isTenCharacters,
          oneNumber: isOneNumber
        });
      };


      const location = useLocation();
    
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const role = urlParams.get('role');
        setSignupRole(role);
        
        console.log("Received role from URL:", role);
      }, [location]);
    

      const handleCreateAccount = () => {
        if (
          validations.capitalLetter &&
          validations.specialCharacter &&
          validations.tenCharacters &&
          validations.oneNumber &&
          userPassword === confirmPassword
        ) {
          setLoading(true); // Start loading indicator
      
          // Determine the API endpoint based on the role
          const apiUrl = signupRole === "Users" ? `/auth/signup` : `/partner/signup`;
      
          axios
            .post(
              apiUrl, // Use dynamic API endpoint
              {
                username: userName,
                email: userEmail,
                password: userPassword,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(({ data }) => {
              setLoading(false); // Stop loading
              if (data.successful) {
                setShowOtp(true); // Show OTP input for verification
              } else {
                alert("Signup failed: Unexpected response from the server");
              }
            })
            .catch((error) => {
              setLoading(false); // Stop loading on error
              if (error.response) {
                console.error("Error response:", error.response.data);
                alert(`Signup failed: ${error.response.data.message}`);
              } else {
                console.error("Error message:", error.message);
                alert("Signup failed: Something went wrong");
              }
            });
        } else {
          alert("Please ensure all password requirements are met and passwords match.");
        }
      }; // <-- Ensure proper closing of the function
      
      const confirmEmail = () => {
        // Dynamic API for OTP verification
        const verifyOtpUrl = signupRole === "Users" ? `/auth/verifyOTP` : `/partner/verifyOTP`;
    
        axios
          .post(verifyOtpUrl, {
            email: userEmail,
            otp: userOtp,
          })
          .then(({ data }) => {
            if (data.success) {
              window.location.href = "/login"; // Navigate to login
            } else {
              setWrongOtp(true); // Show error for incorrect OTP
            }
          })
          .catch((error) => {
            console.error(
              "Error during OTP verification:",
              error.response ? error.response.data : error.message
            );
            alert("OTP verification failed. Please try again.");
          });
      };
    

    return ( 
        <>
            <div className='regContainer'>
               <div className='regleftside'></div>
               <div className='regrightside'>
                <div>
                    <img src={logo} alt="" className='logoimg'/>
                    <h2>Register</h2>
                    <div className='input1'>
                        <input type="email" placeholder='Email' disabled={showOtp}
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                        />
                        {/* <div className='availabilityBox'>{emailAvailable ? 'Available': 'Not Available'}</div> */}
                    </div>
                    <div className='input1'>
                        <input type="text" placeholder='Username...' disabled={showOtp}
                             value={userName}
                             onChange={e => setUserName(e.target.value)}
                        />
                       {/* <div className='availabilityBox'>{usernameAvailable ? 'Available': 'Not Available'}</div> */}
                    </div>
                    <div className='passwordWrapper'>
                        <div className='input2'>
                            <input type="password" placeholder='Password' disabled={showOtp}
                                 value={userPassword}
                                 onChange={e => setUserPassword(e.target.value)}
                            />
                        </div>
                        <div className='input2'>
                            <input type="password" placeholder='Confirm Password' disabled={showOtp}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                style={{border: userPassword === confirmPassword ? "#e7e7e7" : "red"}}
                            />
                        </div>
                    </div>
                    <div className='passreq' onClick={e => setShowPassReq(!showPassReq)}>See Password Requirements</div>
                    {showPassReq && 
                    <div className='passreqCard'>
                    <div style={{ color: validations.capitalLetter ? 'green' : 'red' }}>
                      {validations.capitalLetter ? <img src={tickMarkValid} alt="" /> : <img src={tickMark} alt="" />}
                      Minimum One Capital Letter
                    </div>
                    <div style={{ color: validations.specialCharacter ? 'green' : 'red' }}>
                      {validations.specialCharacter ? <img src={tickMarkValid} alt="" /> : <img src={tickMark} alt="" />}
                      Minimum One Special Character
                    </div>
                    <div style={{ color: validations.tenCharacters ? 'green' : 'red' }}>
                      {validations.tenCharacters ? <img src={tickMarkValid} alt="" /> : <img src={tickMark} alt="" />}
                      Minimum Ten Characters
                    </div>
                    <div style={{ color: validations.oneNumber ? 'green' : 'red' }}>
                      {validations.oneNumber ? <img src={tickMarkValid} alt="" /> : <img src={tickMark} alt="" />}
                      Minimum One Number
                    </div>
                  </div>}
                    {showOtp && <div className='input2' style={{width:'100%', marginTop:"40px"}}>
                            <input type="text" placeholder='Email verification code'
                                value={userOtp}
                                onChange={e => setUserOtp(e.target.value)}
                            />
                        </div>}
                    <div className='nextStep'
                        style={{opacity: userEmail &&
                            userName && userPassword && confirmPassword && 
                            userPassword === confirmPassword && validations.capitalLetter && validations.specialCharacter && validations.tenCharacters && validations.oneNumber ? 1: 0.5
                        }}
                        onClick={showOtp ? confirmEmail:  handleCreateAccount}>{loading ? "Loading...": showOtp ? "Submit": "Next Step"}</div>
                </div>
               </div>
            </div>
        </>
     );
}
 
export default NewHomePage;