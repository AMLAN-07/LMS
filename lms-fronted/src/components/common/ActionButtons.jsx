function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="actions">
      <button className="secondary-btn small" onClick={onEdit}>Edit</button>
      <button className="danger-btn small" onClick={onDelete}>Delete</button>
    </div>
  )
}

export default ActionButtons
