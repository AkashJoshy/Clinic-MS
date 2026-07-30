import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
          const email = profile.emails?.[0]!.value;
          if (!email) {
            return done(new Error("No email found in Google profile"));
          }
          const userObj = {
            name: profile.displayName,
            email: profile.emails?.[0]?.value || profile._json.email,
            isVerified: profile.emails?.[0]?.verified || profile._json.email_verified,
            imageUrl: profile.photos?.[0]?.value || profile._json.picture,
            provider: profile.provider.toUpperCase()
          }
    
        return done(null, userObj);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;