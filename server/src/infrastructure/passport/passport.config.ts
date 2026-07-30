import passport from "passport";
import { MongooseUserRepository } from "../repositories/mongoose-user.repository.ts";
import "./strategies/google.strategy.ts";

const userRepository = new MongooseUserRepository();

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
