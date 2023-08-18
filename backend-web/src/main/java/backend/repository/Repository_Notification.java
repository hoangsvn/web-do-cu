package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import backend.modal.Notification;

public interface Repository_Notification extends JpaRepository<Notification, Long> {

	@Query("SELECT u FROM Notification u WHERE u.userid=:id OR u.userid=0")
	List<Notification> findAllNotification(Long id);
	@Query("SELECT u FROM Notification u WHERE u.userid=:id")
	List<Notification> findAllNotificationbyUid(Long id);

	List<Notification> findAllByUserid(Long id);
}
