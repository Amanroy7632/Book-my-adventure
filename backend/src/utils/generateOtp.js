function generateOTP(length = 6) {
    // Generate a random number and convert it to a string
    const otp = Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1)));

    return otp.toString(); // Return OTP as a string
}
export {generateOTP}
// const otp = generateOTP();
// console.log("Your OTP is:", otp);

