import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, Timestamp, query, orderBy, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles.css";

export default function SubmitPlace() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle media file selection
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  // Fetch previous submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      const q = query(collection(db, "places"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mediaUrls = [];

      // Upload media to Firebase Storage
      for (let file of mediaFiles) {
        const storageRef = ref(storage, `places/${file.name}-${Date.now()}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        mediaUrls.push(url);
      }

      // Save place to Firestore
      await addDoc(collection(db, "places"), {
        name,
        description,
        location,
        date: date ? Timestamp.fromDate(new Date(date)) : Timestamp.now(),
        mediaUrls,
        createdAt: Timestamp.now(),
        userId: auth.currentUser?.uid || null,
      });

      alert("Place submitted successfully!");
      setName(""); setDescription(""); setLocation(""); setDate(""); setMediaFiles([]); setPreviewUrls([]);
      // Refresh submissions
      const snapshot = await getDocs(query(collection(db, "places"), orderBy("createdAt", "desc")));
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (error) {
      console.error(error);
      alert("Error submitting place: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="submit-place-container">
      <h2>Submit Your Local Place / Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Place Name" value={name} onChange={e=>setName(e.target.value)} required />
        <textarea placeholder="Description / Story" value={description} onChange={e=>setDescription(e.target.value)} required />
        <input type="text" placeholder="Nearest Location" value={location} onChange={e=>setLocation(e.target.value)} required />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} />
        <div className="preview-gallery">
          {previewUrls.map((url, idx) => (
            <img key={idx} src={url} alt="preview" className="preview-media" />
          ))}
        </div>
        <button type="submit" className="btn-gradient" disabled={loading}>{loading ? "Submitting..." : "Submit Place"}</button>
      </form>

      <h3>Your Submitted Places</h3>
      <div className="cards-container">
        {submissions.map(place => (
          <div key={place.id} className="place-card">
            {place.mediaUrls && place.mediaUrls.length > 0 && (
              <div className="image-gallery">
                {place.mediaUrls.map((url, index) => (
                  url.endsWith(".mp4") ? (
                    <video key={index} src={url} controls width="250" />
                  ) : (
                    <img key={index} src={url} alt={place.name} />
                  )
                ))}
              </div>
            )}
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <p><strong>Location:</strong> {place.location}</p>
              <p><strong>Date:</strong> {place.date?.toDate().toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}