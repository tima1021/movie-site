const Footer = () => {
  return (
    <footer className="w-screen bg-[#4338CA]  py-10 flex justify-center items-start shrink-0 mt-[51px] ">
      <div className="container flex items-start justify-between">
        <div className="flex flex-col items-start self-stretch gap-3">
          <div className="flex justify-center gap-2">
            <img src="/film-white.png" alt="" className="w-5 h-5 " />
            <p className="text-[16px] font-bold text-white">Movie Z</p>
          </div>
          <p className="text-[14px] font-normal text-white">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-start justify-end gap-[96px] ">
          <div className="flex flex-col h-[200px] items-start gap-3">
            <p className="text-[14px] font-normal text-white">
              Contact Information
            </p>
            <div className="flex items-center gap-3">
              <img src="/mail.png" alt="" className="w-4 h-4" />
              <div className="flex flex-col w-full">
                <p className="text-[14px] font-medium text-white">Email:</p>
                <p className="text-[14px] font-medium text-white">
                  support@movieZ.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <img src="/phone.png" alt="" className="w-4 h-4" />
              <div className="flex flex-col w-full ">
                <p className="text-[14px] text-white font-medium">Phone:</p>
                <p className="text-[14px] text-white font-medium">
                  +976 (11) 123-4567
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-[14px] text-white font-medium">Follow us </p>
            <div className="flex flex-col gap-3 xl:flex-row">
              <p className="text-[14px] text-white font-medium">Facebook</p>
              <p className="text-[14px] text-white font-medium">Instagram</p>
              <p className="text-[14px] text-white font-medium">Twitter</p>
              <p className="text-[14px] text-white font-medium">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
