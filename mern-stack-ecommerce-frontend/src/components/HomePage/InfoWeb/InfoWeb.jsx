import './infoweb.css'

const InfoWeb = () => {
    return ( 
        <>
        <div className="Container-info">
            <div className="left-info">
                <img  src="//cdn.shopify.com/s/files/1/0648/3604/2966/files/store-banner-1.jpg?v=1651553362" itemprop="banner"/>
            </div>
            <div className="right-info">
                <a href className="store-info">
                    <div className="store-wrapper">
                        <div className="store-description">
                            <div className="title-wrapper">
                                <h2 className="subtitle">Wine testing</h2>
                                <h2 className="title">about our winery wine store</h2>
                            </div>
                        <div className="store-desc">Lorem Ipsum has been the industry s standard dummy text ever the 1500s, when an unknown printer took a galley type and scrambled it to make a type ..</div>
                        </div><div className="store-inner">
                        <img src="//cdn.shopify.com/s/files/1/0648/3604/2966/files/store-banner-2.jpg?v=1651553377" itemProp="banner" />
                    </div>
                    
                    </div>
                </a>

            </div>


        </div>
        </>
     );
}
 
export default InfoWeb;