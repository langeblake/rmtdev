import toast from "react-hot-toast";

export const handlError = (error: unknown) => {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else {
      message = "An error occurred";
    }

    toast.error(message);
  };