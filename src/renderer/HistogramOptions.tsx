import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';

interface HistogramOptionsProps {
  setParams: (params: Params) => void;
  error: boolean;
  setError: (error: boolean) => void;
  setData: (data: Array<{ date: string; value: number }>) => void;
}

interface Params {
  startDate: string;
  endDate: string;
  frequency: string;
  transform: string;
}

const HistogramOptions: React.FC<HistogramOptionsProps> = ({ setParams, error, setError, setData }) => {
    const startRef = useRef<HTMLInputElement | null>(null);
    const endRef = useRef<HTMLInputElement | null>(null);
    const freqRef = useRef<HTMLSelectElement | null>(null);
    const transformRef = useRef<HTMLSelectElement | null>(null);
    
    const samplingDropdown = ["monthly", "quarterly", "annual"];
    const transformDropdown = [
        { none: "none" }, 
        { "row on row change": "diff" },
        { "row on row % change": "rdiff" },
        { cumulative: "cumul" }, 
        { normalize: "normalize" }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const startDate = startRef.current?.value;
        const endDate = endRef.current?.value;
        const frequency = freqRef.current?.value;
        const transform = transformRef.current?.value;
        
        if (startDate && endDate && startDate >= endDate) {
            setError(true);
        } else {
            setError(false);
            console.log("submitted form", startDate, endDate, frequency);
            setParams({
                startDate: startDate || "",
                endDate: endDate || "",
                frequency: frequency || "",
                transform: transform || "",
            });
        }
    };

    return (
        <div>
           <form onSubmit={handleSubmit} className="form">
                <div className='form-item'>
                  <div className="date-picker-form">
                    <label htmlFor="start">Date Range </label>
                    <input className="date-picker" style={error ? {color: "red"} : {}} type="date" id="start-date" ref={startRef} defaultValue={new Date("01-01-1900").toISOString().split('T')[0]} />-  
                    <input className='date-picker' style={error ? {color: "red"} : {}} type="date" id="end-date" ref={endRef} defaultValue={new Date().toISOString().split('T')[0]}/>
                    {error ? <div className="error">Start date cannot be more recent than the end date.</div> : ""}
                  </div>
                  <div className='form-item'>
                    <label>Sampling Frequency </label>
                    <select ref={freqRef} className="dropdown">
                        {samplingDropdown.map((el, idx) => {
                            return <option value={el} key={idx}>{el}</option>
                        })}
                    </select>
                  </div>
                  <div className='form-item'>
                    <label>Transform </label>
                    <select ref={transformRef} className="dropdown">
                        {transformDropdown.map((el, idx) => {
                            const label = Object.keys(el)[0];
                            return <option value={el[label]} key={idx}>{label}</option>
                        })}
                    </select>
                  </div>
                </div>
                <div className='form-item'>
                    <Button className="Button" type="submit" variant="contained" startIcon={<SendIcon />}>Submit</Button>
                    <Button sx={{ marginLeft: "5px" }} type="reset" variant="contained" startIcon={<DeleteIcon />} onClick={() => {
                        setData([]);
                    }}>Clear Data</Button>
                </div>
            </form>     
        </div>
    );
};

export default HistogramOptions;
