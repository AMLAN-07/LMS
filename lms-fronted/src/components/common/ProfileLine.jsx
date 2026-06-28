function ProfileLine({ label, value }) {
  return (
    <p className="profile-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </p>
  )
}

export default ProfileLine
