package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.modal.DanhMuc;
@Repository
public interface Repository_DanhMuc extends JpaRepository<DanhMuc, Long> {

}
