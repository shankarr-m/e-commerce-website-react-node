import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return (
        <>
            <div className='bg-light'></div>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" style={{ padding: '10px', backgroundColor: 'transparent', borderLeft: 'nonr' }}>
                                    <FontAwesomeIcon icon={faSearch} beatFade style={{ color: '#146bad', fontSize: '1.2rem' }} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
