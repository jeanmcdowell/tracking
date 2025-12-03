import React, { useState, useEffect } from "react";

const weeks = [
  { label: "Week of Jan 30, 2026", start: "2026-01-30", end: "2026-02-05" },
  { label: "Week of Feb 6, 2026",  start: "2026-02-06", end: "2026-02-12" },
  { label: "Week of Feb 13, 2026", start: "2026-02-13", end: "2026-02-19" },
  { label: "Week of Feb 20, 2026", start: "2026-02-20", end: "2026-02-26" },
  { label: "Week of Feb 27, 2026", start: "2026-02-27", end: "2026-03-06" },
];

export default function Timeline() {
  const [films, setFilms] = useState(() => {
    const saved = localStorage.getItem("filmTimeline");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("filmTimeline", JSON.stringify(films));
  }, [films]);

  const addFilm = (weekLabel) => {
    setFilms(f => f.concat({
      id: Date.now(),
      week: weekLabel,
      title: "Untitled",
      distributor: "",
      rating: "",
      releaseType: "",
      poster: "",     // data URL or external URL
    }));
  };

  const onPosterFile = (file, id) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      setFilms(f => f.map(x => x.id === id ? { ...x, poster: e.target.result } : x));
    };
    reader.readAsDataURL(file);
  };

  const onChange = (id, field, value) => {
    setFilms(f => f.map(x => x.id === id ? { ...x, [field]: value } : x));
  };

  const exportCSV = () => {
    const header = "Title,Distributor,Rating,ReleaseType,Week,PosterURL\n";
    const rows = films.map(f => {
      const csv = [
        f.title, f.distributor, f.rating, f.releaseType, f.week, f.poster || ""
      ].map(v => '"' + String(v).replace(/"/g, '""') + '"').join(",");
      return csv;
    }).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "film_timeline.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    if (window.confirm("Clear all films")) {
      setFilms([]);
      localStorage.removeItem("filmTimeline");
    }
  };

  return (
    <div className="app">
      <div className="toolbar">
        <h1>Film Release Timeline</h1>
        <div>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
          <button className="btn" style={{marginLeft:8}} onClick={clearAll}>Clear All</button>
        </div>
      </div>

      <div className="timeline">
        {weeks.map(w => (
          <div className="week" key={w.label}>
            <div className="week-head">
              <div className="week-title">{w.label}</div>
              <button className="btn add" onClick={() => addFilm(w.label)}>+ Add Film</button>
            </div>

            <div className="film-grid">
              {films.filter(f => f.week === w.label).map(film => (
                <div className="film" key={film.id}>
                  {film.poster
                    ? <img className="poster" src={film.poster} alt={film.title || "poster"} />
                    : (
                      <label className="upload-drop">
                        <div>
                          <div>Drop or click to upload</div>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display:"none" }}
                            onChange={e => onPosterFile(e.target.files[0], film.id)}
                          />
                        </div>
                      </label>
                    )
                  }
                  {/* Optional: paste an external URL if you prefer */}
                  <input
                    className="input"
                    placeholder="Or paste poster URL"
                    value={film.poster}
                    onChange={e => onChange(film.id, "poster", e.target.value)}
                  />
                  <input className="input" placeholder="Title"
                         value={film.title} onChange={e => onChange(film.id, "title", e.target.value)} />
                  <input className="input" placeholder="Distributor"
                         value={film.distributor} onChange={e => onChange(film.id, "distributor", e.target.value)} />
                  <input className="input" placeholder="Rating"
                         value={film.rating} onChange={e => onChange(film.id, "rating", e.target.value)} />
                  <input className="input" placeholder="Wide / Limited"
                         value={film.releaseType} onChange={e => onChange(film.id, "releaseType", e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
