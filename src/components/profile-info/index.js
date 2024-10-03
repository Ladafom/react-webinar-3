import SideLayout from "../side-layout";
import './style.css'

function ProfileInfo(props) {
  return (
    <SideLayout padding={'medium'} direction={'column'} side={'start'}>
      <h2 className="ProfileInfo-title">
        {props.translator('profile.title')}
      </h2>
      <p className="ProfileInfo-p">
        {props.translator('profile.name')}:
        <strong> {props.user?.profile?.name}</strong>
      </p>
      <p className="ProfileInfo-p">
        {props.translator('profile.phone')}:
        <strong> {props.user?.profile?.phone}</strong>
      </p>
      <p className="ProfileInfo-p">
        email:
        <strong> {props.user?.email}</strong>
      </p>
    </SideLayout>
  );
}

export default ProfileInfo;