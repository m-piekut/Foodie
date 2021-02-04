const Dinner = ({name, address, date,time, city}) => {
    return (
          <div className="dinner-list__box" >
                        <div className="dinner-list__up">
                            <div className="dinner-list__left">
                                <h4 className="dinner-list__city">{city}</h4>
                                <p className="dinner-list__date">{date} {time}</p>
                            </div>
                        </div>

                        
                        <div className="dinner-list__down">
                        <div className="dinner-list__left">
                            <p className="dinner-list__place">{name}</p>
                            <p className="dinner-list__address">{address}</p>
                        </div>
                        </div>

                    </div>
      );
}
 
export default Dinner;