import { Analytics } from "../components/Analytics"

export const Home =()=>{
    return<>
        <main>
            <section className="section-hero">
                 <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>We are the World Best IT Company</p>
                        <h1>Welcome to WELLNESS VIVEK</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nesciunt amet. Reiciendis, quia provident. Sapiente delectus quia aperiam nulla nisi quasi, id necessitatibus dolorem dolorum quibusdam eligendi nesciunt corporis ipsam reprehenderit molestias iure distinctio totam labore sit! </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn">connect now</button></a>
                            <a href="/service"><button className="btn secondary-btn">learn more</button></a>
                        </div>
                    </div>

                    {/*hero images*/}
                    <div className="hero-image">
                        <img src="/images/home.png" alt="coding" />
                    </div>
                 </div>
            </section>
        </main>

        {/*2nd section*/}
        <Analytics/>

        {/*3rd section */}
        <section className="section-hero">
                 <div className="container grid grid-two-cols">
                 <div className="hero-image">
                        <img src="/images/home2.png" alt="coding" />
                    </div>
                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nesciunt amet. Reiciendis, quia provident. Sapiente delectus quia aperiam nulla nisi quasi, id necessitatibus dolorem dolorum quibusdam eligendi nesciunt corporis ipsam reprehenderit molestias iure distinctio totam labore sit! </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn">connect now</button></a>
                            <a href="/service"><button className="btn secondary-btn">learn more</button></a>
                        </div>
                    </div>

                    {/*hero images*/}
                   
                 </div>
            </section>
    </>
}