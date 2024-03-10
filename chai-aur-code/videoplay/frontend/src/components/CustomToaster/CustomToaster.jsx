import toast, { ToastBar, Toaster } from "react-hot-toast";
import { closeIcon } from "../../assets";

const CustomToaster = () => {
  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          borderRight: "1px solid rgba(255 255 255 / 0.3)",
          borderBottom: "1px solid rgba(255 255 255 / 0.3)",
          padding: "16px",
          color: "#fff",
          background: "#0a0a0a",
          width: "auto",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <img
                    src={closeIcon}
                    alt=""
                    style={{
                      minWidth: "40px",
                      minHeight: "40px",
                    }}
                  />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default CustomToaster;
