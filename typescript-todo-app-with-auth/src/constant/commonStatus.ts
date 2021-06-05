const commonStatus = {
    success: function success (message = "success",status: number, data: object) {
      return{
        ok:true,
        message,
        status,
        data
      }
    },
    error: function error(message: string, status: number, data: {}) {
      return {
        ok:false,
        message,
        status,
        data
      }
    },
  };

export { commonStatus };