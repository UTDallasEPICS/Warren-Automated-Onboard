import React, {useState,useEffect} from 'react';
import axios from 'axios';
import SendToArchiveBoxIcon from '../../icons/SendToArchiveBoxIcon';
import Cookies from 'js-cookie';

const ArchiveDepartments = ({deptId}) => {
    const [isArchiving, setIsArchiving] = useState(false);

    return (
        <button
            className={`flex text-white justify-center items-center w-52 h-12 bg-gray-500 rounded-lg cursor-pointer select-none ${
                isArchiving
                    ? 'opacity-50 cursor-not-allowed'
                    : 'active:translate-y-2 active:[box-shadow:0_0px_0_0_#4B5563,0_0px_0_0_#4B556341] active:border-b-[0px] transition-all duration-100 [box-shadow:0_10px_0_0_#4B5563,0_15px_0_0_#4B556341] border-b-[1px] border-gray-400'
            }`}
            onClick={async () => {
                setIsArchiving(true);
                await axios.put(`http://localhost:5010/department/archive/${deptId}`);
                window.location.reload();
                setIsArchiving(false);
            }}
        >
            <SendToArchiveBoxIcon />
            <span>Archive Department</span>
        </button>
    );
};

export default ArchiveDepartments;