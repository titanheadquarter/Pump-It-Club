export const outsetaConfig = {
  domain: "titandevelopment.outseta.com",
  load: "auth,profile,support,chat,emailList,leadCapture,nocode",
  monitorDom: true,
  tokenStorage: "cookie",
  translationLang: "de",
  auth: {
    /** URL to redirect after successful registration */
    postRegistrationUrl:
      process.env.NODE_ENV === "production"
        ? "https://pump-it-club.com/thank-you"
        : "http://localhost:3000/thank-you",
    /** URL to redirect after successful authentication */
    authenticationCallbackUrl:
      process.env.NODE_ENV === "production"
        ? "https://pump-it-club.com/app"
        : "http://localhost:3000/app",
    rememberLastEmail: true,
    /** Public JWT for Outseta (Find under Sign Up > Advanced in Outseta) */
    publicKey: `-----BEGIN CERTIFICATE----- 
MIIC2DCCAcCgAwIBAgIQAP39AmQoGYSares6QchmrzANBgkqhkiG9w0BAQ0FADAnMSUwIwYDVQQD
DBx0aXRhbmRldmVsb3BtZW50Lm91dHNldGEuY29tMCAXDTI2MDEwMzAxNDQwM1oYDzIxMjYwMTAz
MDE0NDA0WjAnMSUwIwYDVQQDDBx0aXRhbmRldmVsb3BtZW50Lm91dHNldGEuY29tMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuGN+MOZFWBX0TZsUh98o+uv6ssL72DS051CDTHmB88AT
/8zq06hZNQxfhMd0ZTXHmcmnbcO7FE5iaeSax4hLiImyW7gQvzLPhOkIpV7N3Szxgq59c6vVf9lO
bwZG/jr6KsFerzmW2uYNsjA+jdtuoPEirfdRkG0q2JX5rSFK4ilKu49kq8GFemA8YJryopDTc/zI
aJn0O6UvD6ba6WM5FS5nM/Yj4iQFRTsXSMj3DpBKdPi8rNffKE43AdZAvdpRzAMklDFciDCvT6EU
DeUqvKjG2H33BjBozSSfGyuW/o99Q/9QYoezOzXDS6KvgRVwJuwmIX4aSPvhcAaRJcMz1QIDAQAB
MA0GCSqGSIb3DQEBDQUAA4IBAQCWVGvZNMu1SaHZRL4Hwc2GYOmxNMiKSUlLyuvkJpT3Bva4rYFi
j09ZOUr82ZmulEVWSOEbCH3KHTag2SbU3Zn2x9hzlB7RpPFsgYleMrvZoGYrkNm84OYZ5M7IJvAI
8gs/bsB5TKagS9bbXf9U0vHcSdtkezZeAaS3BJw9iByqQKMB+YsTKb5yTFA/49LuxPEYQYOJeVLJ
85CjK66vFb0+q4rCHVym9ToTW4gLXY0zvR8xJ2mhTqxCy4wCI4Jl6BPYt1PRrFPp+OpDAC6v26oc
MCsVnWjvpvwSv8BKM2WQPxDY6EueosLM2M0TELiOcqrtCK9oWilSZXNh9IuZNxHn
-----END CERTIFICATE----- `,
  },
};
