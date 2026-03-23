const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export interface AuthResponse {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Registration failed!");
    }
    return res.json();
};

export const loginUser = async (data: {
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Login failed!")
    }
    return res.json();
}

export const logoutUser = async (): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
};

export const getMe = async (): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}; 