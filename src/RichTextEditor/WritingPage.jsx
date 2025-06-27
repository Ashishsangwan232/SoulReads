import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';
import Checkbox from '../components/checkbox/Checkbox';
// import './WritingPage.css';

export default function WritingPage({
  autosaveOn,
  setAutosaveOn,
  showRestorePrompt,
  autosavedData,
  setTitle,
  setCategory,
  setValue,
  setEditorKey,
  discardAutosavedData,
  title,
  category,
  value,
  editorKey,
  wordCount,
  handleSave,
  handleManualSave,
  message,
  setShowRestorePrompt,
  saving,
}) {
  const navigate = useNavigate();
  const handlehome = () => {
    navigate('/')
  };
  return (
    <div className="wrt-pg-cont">
      {/* leftside */}
      <div className='home-without-soulreads'>
        <span className="material-symbols-outlined" onClick={handlehome}>Home</span>
      </div>
      <div className='wrt-pg-leftside'>
        <div className="wrt-header-logo">
          <div className='home-with-soulreads'>
            <span className="material-symbols-outlined" onClick={handlehome}>Home</span>
            <hr />
            <hr />
          </div>
          <Link to="/" className="wrt-brand">SoulReads</Link>
        </div>
      </div>
      {/* middle */}
      <div className='wrt-pg-middle'>
        {showRestorePrompt && autosavedData && (
          <div className="restore-popup">
            <p>Restore last draft from {new Date(autosavedData._autosaveTime).toLocaleString()}?
              <span className="material-symbols-outlined" onClick={() => setShowRestorePrompt(false)}>close</span>
            </p>
            <div className="popup-buttons">
              <button onClick={() => {
                setTitle(autosavedData.title);
                setCategory(autosavedData.category || 'story');
                setValue(JSON.parse(autosavedData.content));
                setEditorKey(prev => prev + 1);
                setShowRestorePrompt(false);
              }}>Restore</button>
              <button onClick={discardAutosavedData}>Discard</button>
            </div>
          </div>
        )}
        <div className="wrt-title-bar">
          <div className='wrt-pg-title-div'>
            <textarea
              placeholder="Untitled document"
              rows={1}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="wrt-title-input"
            />
          </div>
          <div className='wrt-pg-selection'>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="story">Story</option>
              <option value="journal">Journal</option>
              <option value="selfReflection">SelfReflection</option>
            </select>
          </div>
        </div>
        <main className="wrt-editor">
          <RichTextEditor key={editorKey} value={value} setValue={setValue} />
        </main>

      </div>
      {/* rightside */}
      <div className='wrt-pg-rightside'>
        <div className="wrt-header-right">
          <label className="autosave-toggle">
            <Checkbox autosaveOn={autosaveOn} setAutosaveOn={setAutosaveOn} />
            Autosave
          </label>
        </div>
        <footer className="wrt-footer">
          <div className="wrt-wordcount">{wordCount} words</div>
          <div className="footer-buttons">
            <button onClick={() => handleSave(false)} disabled={saving}>
              {saving ? 'Saving...' : 'Publish'}
            </button>
            <button onClick={() => handleSave(true)}>Save as Draft</button>
            <button onClick={handleManualSave}>Save Version</button>
          </div>
        </footer>
      </div>


      {/* <header className="wrt-pg-header">
      </header> */}


      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
