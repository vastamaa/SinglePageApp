import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export function InstrumentSinglePage(props)
{
    const params = useParams();
    const id = params.hangszerId;
    const [instrument, setInstrument] = useState([]);
    const [isPending, setPending] = useState(false);

    // useEffect(() => {
    //     setPending(true);
    //     fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" })
    //         .then((res) => res.json())
    //         .then((hangszerek) => setInstrument(hangszerek))
    //         .catch(console.log)
    //         .finally(() => {
    //             setPending(false);
    //         });
    // }, [])

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" })
                const hangszer = await res.json();
                setInstrument(hangszer);
            }
            catch(e)
            {
                console.log(e);
            }
            finally
            {
                setPending(false);
            }

        })
    ();

}, []);

    return(
        <div className="p5 m-auto text-center content bg-lavender">
            {isPending || !instrument.id ? (
              <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5>{instrument.brand}</h5>
                        <h5 className="card-title">{instrument.name}</h5>
                        <div className="lead">{instrument.price} Ft</div>
                        <p>Készleten {instrument.quantity} db</p>
                        <img alt={instrument.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={instrument.imageURL ? instrument.imageURL : "https://via.placeholder.com/400x800"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
