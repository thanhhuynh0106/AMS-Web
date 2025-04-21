import React, { useEffect, useState } from "react";




const Form = ({ onAdd, onUpdate, editingFlight, setEditingFlight }) => {
    const [form, setForm] = useState({
        scheduledTime: "",
        route: "",
        airlines: "",
        flights: "",
        counter: "",
        gate: "",
        status: ""
    });

    useEffect(() => {
        if (editingFlight) {
        setForm(editingFlight);
        }
    }, [editingFlight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingFlight ? "PUT" : "POST";
        const url = editingFlight ? `/api/flights/${form.id}` : "/api/flights";

        fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            editingFlight ? onUpdate(data) : onAdd(data);
            setForm({ scheduledTime: "", route: "", airlines: "", flights: "", counter: "", gate: "", status: "" });
            setEditingFlight(null);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form container">
            <input type="datetime-local" name="scheduledTime" value={form.scheduledTime} onChange={handleChange} placeholder="Scheduled Time"/>
            <input name="route" value={form.route} onChange={handleChange} placeholder="Route" />
            <input name="airlines" value={form.airlines} onChange={handleChange} placeholder="AAirlines" />
            <input name="flights" value={form.flights} onChange={handleChange} placeholder="Flights"/>
            <input name="counter" value={form.counter} onChange={handleChange} placeholder="Counter" />
            <input type="number" name="gate" value={form.gate} onChange={handleChange} placeholder="Gate" />
            <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
            <button type="submit">
                {editingFlight ? "Update flights" : "Add flights"}
            </button>
        </form>
    );
};

export default FlightForm;
