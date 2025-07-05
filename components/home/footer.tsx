export default function FooterFunction() {
      return <>
            <div className="footer-container text-center text-white h-[100px] flex justify-evenly items-center flex-wrap w-[100%] bg-[#000f25]">
                  <footer className="each-flex-items-footer">
                        <p>This web app is powered by Yohanes Mulugeta</p>
                        <p>&copy;Copy right {new Date().getFullYear()}</p>
                  </footer>
            </div>
      </>
}