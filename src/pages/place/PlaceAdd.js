import { useEffect } from "react";
import { Breadcrumb } from "../../components";
import { handleAddPlace } from "../../apis";


export function PlaceAddPage({ setHdTitle }) {
  

  
  useEffect(() => {
    setHdTitle('会場新規登録')
  }, []);

  return (
    <>
    
    <Breadcrumb
      links={[
        { href: "/", content: "トップページ" },
        { href: "/places", content: "会場一覧" },
        {
          href: "/places/add",
          content: "新規会場追加",
          active: true,
        },
      ]}
    />
    <div className="card">
      <form onSubmit={handleAddPlace} className="h-adr">
        <div className="head_main">
            <input type="text" name="name" placeholder="会場名" className="name_large"/>
          </div>
          <div className="detail">
            <div className="memo">
              <textarea type="text" name="memo" placeholder="メモ"/>
            </div>
            <div className="country">
              <textarea type="text" name="country" placeholder="国"/>
            </div>
            <div className="postalCode">
              <textarea type="text" name="postalCode" placeholder="郵便番号"/>
            </div>
            <div className="prefecture">
              <textarea type="text" name="prefecture" placeholder="都道府県"/>
            </div>
            <div className="city">
              <textarea type="text" name="city" placeholder="市町村"/>
            </div>
            <div className="street">
              <textarea type="text" name="street" placeholder="番地"/>
            </div>
            <div className="tel">
              <textarea type="text" name="tel" placeholder="TEL"/>
            </div>
            <div className="fax">
              <textarea type="text" name="fax" placeholder="FAX"/>
            </div>
          </div>{/* 
          <div className="country">
            <input
              type="text"
              className="country"
              name="country" 
              placeholder="国名"
              value="Japan"
            />
          </div>
          <div className="postalCode">
            <input
              type="text"
              className="p-postal-code"
              name="postalCode" 
              placeholder="郵便番号"
            />
          </div>
          <div className="prefecture">
            <input
              type="text"
              className="p-region"
              name="prefecture" 
              placeholder="都道府県"
            />
          </div>
          <div className="city">
            <input
              type="text"
              className="p-locality"
              name="city"
              placeholder="市町村"
            />
          </div>
          <div className="street">
            <input
              type="text"
              className="p-street-address p-extended-address"
              name="street"
              placeholder="番地"
            />
          </div>  */}
          <button type="submit">追加</button>
      </form>
    </div>
    </>
  );
}
