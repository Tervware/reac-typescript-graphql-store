import './index.scss';



function TitleSection() {

  return (
    <div className='title-container'>
      <div className='container'>
      <div className='title-section'>
        <div className='p2 title'>
            <h1>All Products</h1>
            <p>A 360 look at Lumin.</p>
        </div>
        <div className='p2 filter' >
            <select>
                <option defaultValue={''}>Filter by</option> {/* defaultValue is used to set the default value of the select element */}
            </select>
        </div>
        </div>
      </div>
    </div>
    );

    }
    export default TitleSection;