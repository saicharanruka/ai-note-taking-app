"use server";

import { createClient } from "@/auth/server";
import { handleError } from "@/utils/utils";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logoutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signupAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Failed to create user");

    // add user to table in database

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
